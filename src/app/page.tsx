// "use client";

// import { useQuery } from "@tanstack/react-query";
// import { fetchCategories } from "@/lib/api/category";
// import { Category } from "@/types/products";

// export default function HomePage() {
//   const { data, error, isLoading } = useQuery({
//     queryKey: ["categories"],
//     queryFn: fetchCategories,
//   });

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error loading categories</p>;

//   return (
//     <div>
//       <h1>Categories</h1>
//       <ul>
//         {data?.map((category: Category) => (
//           <li key={category.id}>{category.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

import KanbanBoard from "@/components/KanbanBoard";

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Inventory Kanban Board</h1>
      <KanbanBoard />
    </div>
  );
}
