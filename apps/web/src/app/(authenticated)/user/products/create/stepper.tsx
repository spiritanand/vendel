"use client";

import { CircleCheck } from "lucide-react";
import Link from "next/link";
import { useCreateProductStore } from "@/store/createProduct.ts";

function Stepper() {
  const step = useCreateProductStore().step;

  const isBasic = step === "basics";
  const isAdvanced = step === "advanced";

  return (
    <ol className="mx-auto flex w-1/2 items-center px-16 py-4 text-center text-sm font-medium text-gray-500 sm:text-base dark:text-gray-500">
      <li
        className={`after:border-1 flex items-center ${
          isBasic ? "text-gray-300" : "text-green-600 dark:text-green-500"
        }  after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10 dark:after:border-gray-700`}
      >
        <Link href="basics">
          <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] sm:after:hidden dark:after:text-gray-500">
            {isBasic ? (
              <p className="mr-2">1</p>
            ) : (
              <CircleCheck className="mr-2" />
            )}
            Basic <span className="hidden sm:ms-2 sm:inline-flex">Options</span>
          </span>
        </Link>
      </li>

      <li
        className={`after:border-1 flex items-center ${isAdvanced ? "text-gray-200" : ""}`}
      >
        <span className="flex items-center after:mx-2">
          <span className="me-2">2</span>
          Advanced{" "}
          <span className="hidden sm:ms-2 sm:inline-flex">Options</span>
        </span>
      </li>
    </ol>
  );
}

export default Stepper;
