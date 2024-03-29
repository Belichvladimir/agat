import type { LeafletItemProps } from '../LeafletItem/LeafletItem';

function func(data: any) {
        if (!Array.isArray(data[0])) {
            const temp = data[0];
            data[0] = data[1];
            data[1] = temp;
        }
        else {
            for (let i=0; i<data.length; i++) {
                func(data[i]);
            }
        }

}

export function flipCoords(data:LeafletItemProps[]) {
    for (let i = 0; i < data.length; i++) {

        func(data[i].geometry.coordinates)
    }
}
