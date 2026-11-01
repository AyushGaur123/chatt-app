
import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside
      className="h-full w-full md:w-20 lg:w-72 shrink-0 border-r border-base-300
    flex flex-col transition-all duration-200"
    >
      <div className="border-b border-base-300 w-full p-4 md:p-5">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6" />
          <span className="font-medium md:hidden lg:block">Contacts</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="w-full px-4 py-3 md:p-3 flex items-center gap-3">
            <div className="relative shrink-0 mx-0 md:mx-auto lg:mx-0">
              <div className="skeleton size-12 rounded-full" />
            </div>

            <div className="block md:hidden lg:block text-left min-w-0 flex-1">
              <div className="skeleton h-4 w-32 mb-2" />
              <div className="skeleton h-3 w-16" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
