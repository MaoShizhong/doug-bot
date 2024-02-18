import { dirname } from 'path';
import { fileURLToPath } from 'url';
export function getDirName(URL) {
    return dirname(fileURLToPath(URL));
}
