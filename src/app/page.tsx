"use client"

import Container from "@/components/containers/Container";
import CardPost from "@/components/posts/card-post";
import Search from "@/components/widgets/search";
import { db } from "@/lib/db";
import { Post, User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllPosts } from "../../actions/api";
import { POST } from "./api/auth/[...nextauth]/route";
import ContainerPost from "@/components/posts/container-post";



export default function Home() {

  const [search, setSearch] = useState("")
  return (


    <Container className="">
      <Search onClick={setSearch} search={search} />
      <ContainerPost info={search} />
    </Container>
  );
}
