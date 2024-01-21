"use client";

export default function Home() {
  return (
    <main className="min-h-screen justify-between p-10">
      <div className="flex flex-col gap-2">
        <a href="/welcome" className="text-blue-500">
          /welcome
        </a>
        <a href="/drive" className="text-blue-500">
          /drive
        </a>
        <a href="/drive/spreadsheet" className="text-blue-500 ml-5">
          /spreadsheet
        </a>
      </div>
    </main>
  );
}
