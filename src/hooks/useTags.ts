import { useEffect, useState } from "react";
import { getTags } from "../pages/advert/service";
import type { Tag } from "../pages/advert/types";

export function useTags() {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    getTags().then(setTags);
  }, []);

  return tags;
}
