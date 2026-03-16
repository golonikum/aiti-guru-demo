export interface ProductForm {
  title: string;
  price: string;
  brand: string;
  sku: string;
}

export interface AddProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (name: string) => void;
}
