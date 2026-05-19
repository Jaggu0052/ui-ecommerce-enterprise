"use client";

import { ModulePage, statusColumn } from "@/components/dashboard/module-page";
import { productService } from "@/services/product.service";
import type { Category } from "@/types";

export default function CategoriesPage() {
  return (
    <ModulePage<Category>
      title="Categories"
      description="Create, update, and organize product category taxonomy."
      queryKey={["categories"]}
      queryFn={() => productService.categories()}
      columns={[
        { key: "name", header: "Category", sortable: true },
        { key: "products", header: "Products", sortable: true },
        statusColumn("status")
      ]}
    />
  );
}
