import { setBridge, setRedirection } from "@/slices";
import { GlobalInput } from "components/global";
import { useModal } from "hooks/Modal";
import { useSlice } from "hooks/reduxHooks";
import React, { useEffect, useState } from "react";

export const Add_Owner = ({ collection }: { collection: any }) => {
  const [owner, setOwner] = useState("");
  const [{}, dispatch] = useSlice("modal");

  useEffect(() => {
    dispatch(setBridge({ owner }));
    dispatch(
      setRedirection("/collection/" + collection?.collectionToken?.toString())
    );
  }, [owner]);

  return (
    <>
      <div className="flex flex-col gap-3 w-full">
        <GlobalInput
          label="Pass The Address Of The New Owner :"
          handleChange={(e) => setOwner(e.target.value)}
          type="text"
          value={owner}
          error={""}
        />
      </div>
    </>
  );
};
