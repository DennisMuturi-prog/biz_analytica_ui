"use client"

import {
  type LucideIcon,
  FolderPlus,
  FolderPen,
  FolderMinus,
  SearchIcon,
  EllipsisVertical,
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import type { Top10_SalesRepresentativesWeekly } from "@/types/insights"
import { formatter } from "@/lib/helpers"

interface TableAction {
  icon: LucideIcon
  listtitle: string
}

type TopSalesMenBlock= {
  top_10_sales_rep:Top10_SalesRepresentativesWeekly[]
}
const TopSalesMenTable = ({
  top_10_sales_rep
}:TopSalesMenBlock) => {
  const tableActionData: TableAction[] = [
    { icon: FolderPlus, listtitle: "Add" },
    { icon: FolderPen, listtitle: "Edit" },
    { icon: FolderMinus, listtitle: "Delete" },
  ]

  return (
    <Card className="h-full w-full gap-6 pt-6 pb-0">
      <CardHeader className="items-center justify-between px-6 sm:flex">
        <div>
          <CardTitle className="leading-normal">Top Projects</CardTitle>
          <CardDescription>
            Checkout the statistics of top sales reps
          </CardDescription>
        </div>
        <InputGroup className="h-9 w-fit rounded-md">
          <InputGroupInput placeholder="Search" />
          <InputGroupAddon>
            <SearchIcon size={18} />
          </InputGroupAddon>
        </InputGroup>
      </CardHeader>
      <CardContent className="px-0">
        <div className="overflow-x-auto">
          <Table className="min-w-2xl">
            <TableHeader>
              <TableRow className="hover:bg-transparent!">
                <TableHead className="p-2">Sales Rep</TableHead>
                <TableHead className="p-2">Sales amount</TableHead>
                <TableHead className="flex justify-end p-3 pe-6">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="dark:divide-darkborder divide-y divide-border">
              {top_10_sales_rep.map((item, index) => (
                <TableRow key={index}>
                  {/* Customer */}
                  <TableCell className="whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://images.shadcnspace.com/assets/profiles/user-${index}.jpg`}
                        alt="icon"
                        className="h-9 w-9 rounded-full"
                        width={36}
                        height={36}
                      />
                      <div className="line-clamp-2 max-w-56 truncate">
                        <h6 className="text-base! font-normal!">{item.sales_representative}</h6>
                      </div>
                    </div>
                  </TableCell>
                  {/* Budget */}

                  <TableCell className="whitespace-nowrap">
                    <p className="text-sm text-foreground">Kes {formatter.format(item.total_sales)}</p>
                  </TableCell>

                  {/* Dropdown Menu */}
                  <TableCell className="p-3 pe-6 whitespace-nowrap">
                    <div className="flex items-center justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <span className="flex cursor-pointer items-center justify-center rounded-full p-2 hover:bg-muted">
                            <EllipsisVertical width={16} height={16} />
                          </span>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          {tableActionData.map((action, idx) => (
                            <DropdownMenuItem
                              key={idx}
                              className="group flex cursor-pointer gap-3 hover:bg-accent!"
                            >
                              <action.icon />
                              <span>{action.listtitle}</span>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

export default TopSalesMenTable
