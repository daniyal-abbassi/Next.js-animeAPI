"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

export default function Filters() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  function handleSfwFilter(e: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);
    const value = e.target.value; //true or false
    console.log("this is sfw radioBtn: ", value);
    if (value) {
      params.set("sfw", value);
    } else {
      params.delete("sfw");
    }
    replace(`${pathname}?${params.toString()}`);
  }
  return (
    <fieldset>
      <legend>SFW or NOT ? (adult content)</legend>
      <input
        type="radio"
        id="sfw-true"
        name="sfw"
        value="true"
        onChange={handleSfwFilter}
      />
      <label htmlFor="sfw-true">True</label>

      <input
        type="radio"
        id="sfw-false"
        name="sfw"
        value="false"
        onChange={handleSfwFilter}
      />
      <label htmlFor="sfw-false">True</label>
    </fieldset>
  );
}
