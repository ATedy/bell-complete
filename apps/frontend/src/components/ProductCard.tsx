import {
  Box,
  CardContent,
  CardMedia,
  Card,
  Button,
  Typography,
} from '@mui/material';
import type { Product } from '../api/api';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

interface ProductCardProps {
  product: Product;
  isInWishlist: boolean;
  onAddToWishlist: (product: Product) => void;
  onRemoveFromWishlist: (productId: number) => void;
}

export function ProductCard({
  product,
  isInWishlist,
  onAddToWishlist,
  onRemoveFromWishlist,
}: ProductCardProps) {
  const handleWishlistToggle = () => {
    if (isInWishlist) {
      onRemoveFromWishlist(product.id);
    } else {
      onAddToWishlist(product);
    }
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3,
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h3" noWrap>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {product.type}
        </Typography>
        <Box
          sx={{
            mt: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            {currencyFormatter.format(product.price)}
          </Typography>
          <Button
            size="small"
            onClick={handleWishlistToggle}
            variant={isInWishlist ? 'contained' : 'outlined'}
            color={isInWishlist ? 'error' : 'primary'}
          >
            {isInWishlist ? 'Saved' : 'Save'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
