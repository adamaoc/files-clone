import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="p-10 flex flex-col lg:flex-row items-center justify-center bg-[#2b2929] dark:bg-slate-800 text-white space-y-5">
        <div className="flex flex-col gap-4 py-10 pr-12 max-w-[700px]">
          <h1 className="text-5xl font-bold">Welcome to LOGO</h1>
          <h2 className="text-3xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
            minus adipisci, nostrum sunt eaque nulla cum dolorum fuga quae est.
          </h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus,
            placeat ullam! Et saepe nisi excepturi atque omnis non odit ipsam
            maxime, optio dolor. Animi, eius recusandae ex quisquam cum laborum!
          </p>
          <Link
            href="/dashboard"
            className="flex bg-slate-600 cursor-pointer p-5 w-fit mt-4 rounded-md"
          >
            Try it for free
            <ArrowRight className="ml-2" />
          </Link>
        </div>
        <div className="min-w-[320px] max-w-[700px]">
          <video autoPlay loop muted className="rounded-lg">
            <source
              src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag
          </video>
        </div>
      </div>
    </main>
  );
}
