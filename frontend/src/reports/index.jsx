import { TopSales } from "src/reports/TopSales"
import { TopBranches } from "src/reports/TopBranches"
import { TopProducts } from "src/reports/TopProducts"
import { TopCustomers } from "src/reports/TopCustomers"

export const Reports = () => {
  return (
    <div>
      <TopSales />
      <TopBranches />
      <TopProducts />
      <TopCustomers />
    </div>
  )
}
