import type {CustomBoxPropsI} from './types.ts';


const CustomBox = (props: CustomBoxPropsI) => {

    const {content} = props;

    return (
        <div className="custom-box-component">
            {content}
        </div>
    )
}

export { CustomBox };