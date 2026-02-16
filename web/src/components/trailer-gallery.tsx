"use client";

import Image from "next/image";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";

const gallery = [
  {
    title: "Академия Роа",
    src: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Гильдия Приключенцев",
    src: "https://images.unsplash.com/photo-1579370318443-8da81645784a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Ледяной Север",
    src: "https://images.unsplash.com/photo-1464823063530-08f10ed1a2dd?auto=format&fit=crop&w=1200&q=80",
  },
];

export function TrailerGallery() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-3">
        {gallery.map((item) => (
          <Card key={item.title} className="overflow-hidden p-0">
            <Image src={item.src} alt={item.title} width={1200} height={800} className="h-44 w-full object-cover" />
            <div className="p-4">
              <p className="text-sm">{item.title}</p>
            </div>
          </Card>
        ))}
      </div>
      <button
        onClick={() => setOpen(true)}
        className="mt-4 rounded-xl border border-[#5cc9f7] bg-[#10324f] px-5 py-3 text-sm font-semibold"
      >
        Смотреть трейлер
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title="Трейлер сезона">
        <div className="aspect-video w-full overflow-hidden rounded-lg">
          <iframe
            title="Trailer"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      </Modal>
    </>
  );
}
