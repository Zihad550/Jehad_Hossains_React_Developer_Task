import React from 'react';
import { useParams } from 'react-router-dom';

function withParams(Element) {
    function Wrapper(props) {
        return <Element {...props} params={useParams()} />;
    }
    return Wrapper;
}

export default withParams;
