import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';


const BacktoHomepageBtn = () => {
   return (
     <div className="px-8 py-4">
       <Link
         href="/"
         className="inline-flex items-center gap-1.5 font-medium text-muted-foreground transition-colors hover:text-primery text-[10px]"
       >
         <ArrowLeft className="h-4 w-4" />
         Back to homepage
       </Link>
     </div>
   );
};

export default BacktoHomepageBtn;