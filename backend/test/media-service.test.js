import assert from "node:assert/strict";
import test from "node:test";
import { deleteImage, uploadImage } from "../src/modules/media/media.service.js";

function fakeClient() {
  const calls = { upload: [], remove: [] };
  return {
    calls,
    storage: { from(bucket) { return {
      async upload(path, buffer, options) { calls.upload.push({ bucket, path, buffer, options }); return { error: null }; },
      getPublicUrl(path) { return { data: { publicUrl: `https://media.test/${bucket}/${path}` } }; },
      async remove(paths) { calls.remove.push({ bucket, paths }); return { error: null }; },
    }; } },
  };
}

test("image upload accepts supported content and generates a gallery path", async () => {
  const client = fakeClient();
  const result = await uploadImage(Buffer.from("image"), "image/webp", client);
  assert.match(result.storagePath, /^gallery\/[a-f0-9-]+\.webp$/);
  assert.equal(result.mimeType, "image/webp");
  assert.equal(client.calls.upload[0].bucket, "event-media");
  assert.equal(client.calls.upload[0].options.upsert, false);
});

test("image upload rejects unsupported MIME types", async () => {
  await assert.rejects(() => uploadImage(Buffer.from("file"), "image/gif", fakeClient()), error => error.statusCode === 415);
});

test("image deletion only accepts generated gallery paths", async () => {
  const client = fakeClient();
  await deleteImage("gallery/123e4567-e89b-12d3-a456-426614174000.jpg", client);
  assert.deepEqual(client.calls.remove[0].paths, ["gallery/123e4567-e89b-12d3-a456-426614174000.jpg"]);
  await assert.rejects(() => deleteImage("../private.txt", client), error => error.statusCode === 422);
});
