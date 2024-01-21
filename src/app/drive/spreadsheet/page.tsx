"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { google } from "googleapis";

const formSchema = z.object({
  url: z.string().min(2, {
    message: "url must be at least 2 characters.",
  }),
  range: z.string().min(2, {
    message: "url must be at least 2 characters.",
  }),
  startLine: z.number().default(1),
  timezone: z.string().default("Asia/Tokyo"),
});

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await fetch("/api/drive/sheets", {
      method: "POST",
      body: JSON.stringify(values),
    })
      .then((res) => {
        return res.json();
      })
      .then(console.log);
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <Card className="p-10 min-w-[400px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>スプレッドシートURL</FormLabel>
                  <FormControl>
                    <Input placeholder="URL..." {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="range"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>シート名 </FormLabel>
                  <FormControl>
                    <Input placeholder="シート名" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="startLine"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>取り込み開始行番号 </FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="timezone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>デフォルトタイムゾーン</FormLabel>
                  <FormControl>
                    <Input placeholder="Asia/Tokyo" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <Button type="submit">Load</Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}
