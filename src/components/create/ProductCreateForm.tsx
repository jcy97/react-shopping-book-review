import { useState } from "react";
import { ProductType } from "../../types";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import ThumbnailUploader from "./ThumbnailUploader";
import { useNavigate } from "react-router-dom";
import { createProduct, modifyThumbnail } from "../../utils/api";

const ProductCreateForm = () => {
  const [name, setName] = useState("");
  const [explanation, setExplanation] = useState("");
  const [price, setPrice] = useState(0);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [createdProductId, setCreatedProductId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(event.target.value));
  };
  const handleExplanationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setExplanation(event.target.value);
  };

  const handleCreateProduct = async (event: React.FormEvent) => {
    event.preventDefault();
    const {
      data: { product },
    } = await createProduct({
      name,
      explanation,
      price,
    });
    if (thumbnail) {
      await modifyThumbnail(product.id, thumbnail);
    }
    setIsModalOpen(true);
  };
  const handlePushProductPage = () => {
    setIsModalOpen(false);
    navigate(`/product/${createdProductId}`);
  };
  return (
    <>
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
          상품 생성
        </Typography>
        <form onSubmit={handleCreateProduct}>
          <TextField
            label="상품 이름"
            fullWidth
            value={name}
            onChange={handleNameChange}
            margin="normal"
          />
          <TextField
            label="가격"
            fullWidth
            value={price}
            onChange={handlePriceChange}
            margin="normal"
          />
          <TextField
            label="상품 설명"
            fullWidth
            value={explanation}
            onChange={handleExplanationChange}
            margin="normal"
          />
          <ThumbnailUploader
            value={thumbnail}
            onChange={(file) => setThumbnail(file)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 6 }}
          >
            생성
          </Button>
        </form>
      </Container>
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          상품을 성공적으로 추가했습니다.
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            확인을 누르면 상품상세 페이지로 이동합니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePushProductPage} autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default ProductCreateForm;
