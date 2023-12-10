import { auth } from "@clerk/nextjs";
import Dropable from "../_components/Dropzone";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { FileType } from "@/typeings";
import TableWrapper from "../_components/table/TableWrapper";

export default async function DashboardPage() {
  const { userId } = auth();
  const docsResults = await getDocs(collection(db, "users", userId!, "files"));
  const skeletonFiles: FileType[] = docsResults.docs.map((doc) => ({
    id: doc.id,
    filename: doc.data().filename || doc.id,
    fullName: doc.data().fullName,
    timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
    downloadURL: doc.data().downloadURL,
    type: doc.data().type,
    size: doc.data().size,
  }));
  console.log(skeletonFiles);

  return (
    <div className="border-t">
      {/* <p>Dashboard {userId} </p> */}
      <Dropable />
      <section className="container mx-auto space-y-5">
        <h2 className="font-bold">All Files</h2>
        <div>
          <TableWrapper skeletonFiles={skeletonFiles} />
        </div>
      </section>
    </div>
  );
}
