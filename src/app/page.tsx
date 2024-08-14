import Link from "next/link";
import { db } from "../server/db/index"

export const dynamic = "force-dynamic"

const mockUrls = [
  "https://utfs.io/f/e65af9ce-e412-4be5-ad81-0841b3866862-fz2og5.jpg",
  "https://utfs.io/f/e1ee3a19-511b-400b-9b96-eef23ec3d57e-e1oaos.jpg",
  "https://utfs.io/f/b01a6ddf-2ee0-47f2-8fe2-9b916c2fefb3-jlo1ag.jpg",
  "https://utfs.io/f/ae0de1ae-dfac-4476-aa86-bc0806da434a-nliseh.jpg",
  "https://utfs.io/f/6e253e0d-de4e-4bff-81e2-822a218352b9-nlisfc.jpg",
  "https://utfs.io/f/21bb2d8f-c8f3-40d7-adf2-0d4bc046b4fe-k2ru78.jpg"
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default async function HomePage() {

  const posts = await db.query.posts.findMany()

  console.log(posts)

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => (
          <div key={post.id}>{post.name}</div>
        ))}
        {
          [...mockImages, ...mockImages, ...mockImages].map((image, index) => (
            <div key={image.id + "-" + index} className="w-48">
              <img src={image.url}/>
            </div>
          ))
        }
      </div>
    </main>
  );
}
