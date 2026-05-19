"use client";

import { ModuleAnalytics, ModulePage, moneyColumn, statusColumn } from "@/components/dashboard/module-page";
import { productService } from "@/services/product.service";
import type { Product } from "@/types";

export default function ProductsPage() {
  return (
    <ModulePage<Product>
      title="Products"
      description="Inventory, product CRUD actions, pricing, stock status, and selling performance."
      queryKey={["products"]}
      queryFn={() => productService.list()}
      columns={[
        { key: "name", header: "Product", sortable: true },
        { key: "sku", header: "SKU" },
        { key: "category", header: "Category", sortable: true },
        moneyColumn("price", "Price"),
        { key: "stock", header: "Inventory", sortable: true },
        statusColumn("status")
      ]}
    >
      <ModuleAnalytics title="Inventory Status" />
    </ModulePage>
  );
}
