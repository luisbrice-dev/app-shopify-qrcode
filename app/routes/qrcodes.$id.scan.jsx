import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import db from "../db.server";

import { getDestinationUrl } from "../models/QRCode.server";

export const loader = async ({ params }) => {
  invariant(params.id, "Could not find QR code destination");

  const id = Number(params.id);
  const qrCode = await db.qRcode.findFirst({ where: { id } });

  invariant(qrCode, "Could not find QR code destination");

  await db.qRcode.update({
    where: { id },
    data: { scans: { increment: 1 } },
  });

  return redirect(getDestinationUrl(qrCode));
};
