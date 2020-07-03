import {ServerTenant} from "./types";
import schemas from "./schemas";

const cache = new Map<ServerTenant["slug"], ServerTenant>();

function update(slug: ServerTenant["slug"], value: Partial<ServerTenant>) {
  const cached: ServerTenant = cache.get(slug);

  if (cached) {
    cache.set(slug, {...cached, ...value});
  }
}

function set(slug: ServerTenant["slug"], value: ServerTenant) {
  cache.set(slug, value);
}

function remove(slug: ServerTenant["slug"]) {
  cache.delete(slug);
}

function get(slug: ServerTenant["slug"]) {
  const cached = cache.get(slug);

  if (schemas.server.fetch.isValidSync(cached)) {
    return cached;
  } else {
    return undefined;
  }
}

function clear(): number {
  cache.clear();

  return cache.size;
}

export default {
  get,
  set,
  update,
  remove,
  clear,
};
