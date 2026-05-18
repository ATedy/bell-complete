import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import { apiService, type Product } from '../api/api';
import { ProductCard } from './ProductCard';
interface ProductListProps {
  wishlistItems: Set<number>;
  onAddToWishlist: (product: Product) => void;
  onRemoveFromWishlist: (productId: number) => void;
}

export function ProductList({
  wishlistItems,
  onAddToWishlist,
  onRemoveFromWishlist,
}: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        // Fetch independent data in parallel so the product page loads faster.
        const [productTypes, allProducts] = await Promise.all([
          apiService.getProductTypes(),
          apiService.getProducts(),
        ]);
        setTypes(productTypes);
        setProducts(allProducts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleTypeChange = async (event: SelectChangeEvent) => {
    const type = event.target.value;
    setSelectedType(type);

    try {
      setError(null);
      // Passing undefined keeps the request as /products, while a type adds ?type=...
      const filtered = await apiService.getProducts(type || undefined);
      setProducts(filtered);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to filter products');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <FormControl sx={{ mb: 3, minWidth: { xs: '100%', sm: 220 } }}>
        <InputLabel>Filter by Type</InputLabel>
        <Select value={selectedType} label="Filter by Type" onChange={handleTypeChange}>
          <MenuItem value="">All Products</MenuItem>
          {types.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
            <ProductCard
              product={product}
              isInWishlist={wishlistItems.has(product.id)}
              onAddToWishlist={onAddToWishlist}
              onRemoveFromWishlist={onRemoveFromWishlist}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
