"use client"
import Header from "@/components/Header";
import ProposalList from "@/components/ProposalList";
import Footer from "@/components/Footer";
import { useState } from "react";
import NewProposalForm from "@/app/create/page";
import Link from "next/link";

export default function HomePage() {

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="container mx-auto px-4 py-8">
        <Link href={"/create"}>
          <button className="text-3xl font-bold mb-6">🤖 发布提案</button>
        </Link>
      </section>
      <section className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">🎯 当前提案</h1>
        <ProposalList />
      </section>
    </main>
  );
}
