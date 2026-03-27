import { MOCK_ASSETS } from "@/lib/mockData";
import AssetDetail from "./AssetDetail";

export function generateStaticParams() {
  return MOCK_ASSETS.map((asset) => ({
    partition: asset.partition,
  }));
}

export default function Page() {
  return <AssetDetail />;
}
