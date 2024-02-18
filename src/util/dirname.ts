import { dirname } from 'path';
import { fileURLToPath } from 'url';

export function getDirName(URL: string): string {
    return dirname(fileURLToPath(URL));
}
