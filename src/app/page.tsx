import Link from "next/link";
import { db } from "../server/db/index"
import { SignedOut, SignedIn } from "@clerk/nextjs";

export const dynamic = "force-dynamic"

async function Images() {

  const images = await db.query.images.findMany({
    orderBy:(model, { desc }) => desc(model.id),
  })

  return (
      <div className="flex flex-wrap gap-4">
        {
          [...images, ...images, ...images].map((image, index) => (
            <div key={image.id + "-" + index} className="w-48 flex flex-col">
              <img src={image.url}/>
              <div>
                {image.name}
              </div>
            </div>
          ))
        }
      </div>
  )
}

export default async function HomePage() {

  return (
    <main className="">
      <SignedIn>
        <Images/>
      </SignedIn>
      <SignedOut>
        <div className="w-full h-full text-2xl text-center">Please sign in above</div>
      </SignedOut>

    </main>
  );
}
