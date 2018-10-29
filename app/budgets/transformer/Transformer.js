import TopDownTransformer from './TopDownTransformer';

export default class Transformer {
    constructor(type, data) {
        let ClassTransformer;
        switch (type) {
            case 'topDown':
                ClassTransformer = TopDownTransformer;
                break;
            default:
                ClassTransformer = TopDownTransformer;
                break;
        }

        return new ClassTransformer(data);
    }
}
