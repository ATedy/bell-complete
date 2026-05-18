import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { apiService, type Product } from '../api/api';
import { ProductList } from '../components/ProductList';

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

function App() {
  const [storeName, setStoreName] = useState<string>('');
  const [wishlistItems, setWishlistItems] = useState<Set<number>>(new Set());
  const [error, setError] = useState<string | null>(null);

  // useEffect runs after the first render, which is where React apps usually load
  // data from APIs. The empty dependency array means this only runs once on page load.
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const name = await apiService.getStoreName();
        const wishlist = await apiService.getWishlist();

        setStoreName(name);
        setWishlistItems(new Set(wishlist.map((product) => product.id)));
      } catch (error) {
        const message = getErrorMessage(error, 'Failed to load store data');
        setError(message);
        console.error('Failed to load store data:', error);
      }
    };

    loadInitialData();
  }, []);

  const handleAddToWishlist = async (product: Product) => {
    try {
      setError(null);
      await apiService.addToWishlist(product.id);
      // Create a new Set instead of mutating the old one so React sees the state change.
      setWishlistItems((prev) => new Set([...prev, product.id]));
    } catch (error) {
      const message = getErrorMessage(error, 'Failed to add to wishlist');
      setError(message);
      console.error('Failed to add to wishlist:', error);
    }
  };

  const handleRemoveFromWishlist = async (productId: number) => {
    try {
      setError(null);
      await apiService.removeFromWishlist(productId);
      setWishlistItems((prev) => {
        // Copy before deleting for the same reason as add: React state should be immutable.
        const updated = new Set(prev);
        updated.delete(productId);
        return updated;
      });
    } catch (error) {
      const message = getErrorMessage(error, 'Failed to remove from wishlist');
      setError(message);
      console.error('Failed to remove from wishlist:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: '#fafafa',
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            {storeName || 'Loading...'}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              ml: 2,
              px: 1.5,
              py: 0.5,
              bgcolor: 'rgba(255,255,255,0.2)',
              borderRadius: 1,
            }}
          >
            Wishlist: {wishlistItems.size}
          </Typography>
        </Toolbar>
      </AppBar>

      <Container component="main" sx={{ flex: 1, py: 4 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <ProductList
          wishlistItems={wishlistItems}
          onAddToWishlist={handleAddToWishlist}
          onRemoveFromWishlist={handleRemoveFromWishlist}
        />
      </Container>
    </Box>
  );
}

export default App;
