import { useState } from "react";
import { AddProductDialog } from "./AddProductDialog";
import { AddProductButton } from "./AddProductButton";

interface AddProductProps {
  onSuccess: (name: string) => void;
  buttonClassName?: string;
}

export const AddProduct = ({ onSuccess, buttonClassName }: AddProductProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSuccess = (name: string) => {
    onSuccess(name);
  };

  return (
    <>
      <AddProductButton onClick={() => setIsOpen(true)} className={buttonClassName} />
      <AddProductDialog
        isOpen={isOpen}
        onClose={handleClose}
        onSuccess={handleSuccess}
      />
    </>
  );
};
