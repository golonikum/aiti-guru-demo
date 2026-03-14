export interface NewProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (name: string) => void;
}
