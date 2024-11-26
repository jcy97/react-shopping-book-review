import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Icon,
  IconButton,
  Typography,
} from "@mui/material";
import { ProductType } from "../../types";
import { grey } from "@mui/material/colors";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useCart } from "../../hooks";

type Props = {
  cart: ProductType & { count: number };
};
const CartItem = ({ cart }: Props) => {
  const { changeCount } = useCart();
  return (
    <Card sx={{ display: "flex", marginBottom: 2 }}>
      {cart.thumbnail && (
        <CardMedia
          sx={{ width: 100 }}
          image={`${cart.thumbnail}`}
          title={cart.name}
        />
      )}
      <CardContent sx={{ width: "100%" }}>
        <Typography variant="h6">{cart.name}</Typography>
        <Typography variant="h6" fontSize={14} color={grey[600]}>
          {cart.price.toLocaleString("KR-ko")}원
        </Typography>
        <Grid container justifyContent="space-between">
          <Grid item>
            <IconButton onClick={() => changeCount(cart.id, "decrease")}>
              <Remove />
            </IconButton>
            {cart.count}
            <IconButton onClick={() => changeCount(cart.id, "increase")}>
              <Add />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton>
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
export default CartItem;
