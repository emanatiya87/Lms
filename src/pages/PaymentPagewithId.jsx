import React from "react";
import { useParams } from "react-router";
export default function PaymentPagewithId() {
  const { id } = useParams();
  return <div>pay id:{id}</div>;
}
