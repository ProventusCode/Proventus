"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { ScraperFactory } from "@/lib/scrap/ScraperFactory";
import { zodResolver } from "@hookform/resolvers/zod";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  contestId: z.coerce.number(),
  platform: z.string().min(1, { message: "Platform is required" }),
});

export default function Component() {
  const [contestMetadata, setContestMetadata] = useState<Object>({});
  const [problems, setProblems] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  const scrapContestForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contestId: 0,
      platform: "",
    },
  });

  // const contestMetadata = scraper.getContestMetadata(contestId);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    toast({
      title: "Contest",
      description: (
        <div>
          Contest ID: {values.contestId} Platform: {values.platform}
        </div>
      ),
    });
    const creator = ScraperFactory.getCreator(values.platform);
    const scraper = creator.createScraper();
    const contestMetadata = await scraper.getContestMetadata(values.contestId);
    const problems = await scraper.getProblems(values.contestId);
  
    const submissions = await scraper.getSubmissions(values.contestId);
    setContestMetadata(contestMetadata);
    console.log(contestMetadata);
    console.log(Object.entries(contestMetadata));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 m-4 bg-white rounded shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Contest Web Scraping
        </h2>
        <Form {...scrapContestForm}>
          <form
            onSubmit={scrapContestForm.handleSubmit(onSubmit)}
            className="mt-4 space-y-8"
          >
            <FormField
              control={scrapContestForm.control}
              name="contestId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="contestId">Contest ID</FormLabel>
                  <FormControl>
                    <Input
                      id="contestId"
                      placeholder="Ingresa el identificador del contest"
                      required
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={scrapContestForm.control}
              name="platform"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="platform">Plataforma</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue
                          id="platform"
                          placeholder="Select a platform"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vjudge">Vjudge</SelectItem>
                        <SelectItem value="codeforces">Codeforces</SelectItem>
                        <SelectItem value="hackerrank">HacekeRank</SelectItem>
                        <SelectItem value="leetcode">LeetCode</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Start Scraping
            </Button>
          </form>
        </Form>
      </div>

      <div className="w-full max-w-2xl p-6 m-4 bg-white rounded shadow-md dark:bg-gray-800">
        <Tabs className="w-full" defaultValue="data1">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="contestMetadata">Contest</TabsTrigger>
            <TabsTrigger value="problems">Problemas</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
          </TabsList>
          <TabsContent value="contestMetadata">
            {contestMetadata ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Campo</TableHead>
                    <TableHead>Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(contestMetadata).map((pair) => (
                    <TableRow key={pair[0]}>
                      <TableCell className="font-medium">
                        {String(pair[0])}
                      </TableCell>
                      <TableCell>{String(pair[1])}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div> No hay datos </div>
            )}
          </TabsContent>
          <TabsContent value="problems">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Campo</TableHead>
                  <TableHead>Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Data 2.1</TableCell>
                  <TableCell>Value 2.1</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Data 2.2</TableCell>
                  <TableCell>Value 2.2</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="data3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Data 3</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Data 3.1</TableCell>
                  <TableCell>Value 3.1</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Data 3.2</TableCell>
                  <TableCell>Value 3.2</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
