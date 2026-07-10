import { BrandForm } from "@/components/BrandForm";
import { createBrandAction } from "@/app/actions/brand";

export default function CreateBrandPage() {
  return (
    <div style={{ padding: 24, maxWidth: 600 }}>
      <h1>Создать бренд</h1>
      <BrandForm action={createBrandAction} />
    </div>
  );
}