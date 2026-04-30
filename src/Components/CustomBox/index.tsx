import type { CustomBoxPropsI } from './types.ts';

const CustomBox = (props: CustomBoxPropsI) => {
    const { content, pulse, pulseDelay } = props;

    return (
        <div className={`custom-box-component ${pulse ? 'pulse' : ''}`} style={pulse ? { animationDelay: `${pulseDelay}s` } : {}}>
            {content}
        </div>
    );
};

export { CustomBox };