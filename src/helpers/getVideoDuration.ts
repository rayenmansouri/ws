import * as ffprobe from "@ffprobe-installer/ffprobe";
import execa from "execa";
import { Readable } from "stream";
import { InternalError } from "../core/ApplicationErrors";

export const getVideoDurationFromBuffer = async (buffer: Buffer): Promise<number> => {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);

  const params = ["-v", "error", "-show_format", "-show_streams"];

  const { stdout } = await execa(ffprobe.path, [...params, "-i", "pipe:0"], {
    reject: false,
    input: stream,
  });

  const matched = stdout.match(/duration="?(\d*\.\d*)"?/);
  if (matched && matched[1]) return parseFloat(matched[1]);

  throw new InternalError("No duration found!");
};
