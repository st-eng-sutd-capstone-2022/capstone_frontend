import React from "react";
import { DataGrid } from '@mui/x-data-grid';

const ListView = () => {
    return(
        <div style={{ height: 400, width: '100%' }}>
            <div style={{ display: 'flex', height: '100%' }}>
                <div style={{ flexGrow: 1 }}>
                    <DataGrid/>
                </div>
            </div>
        </div>
    )
}

export default ListView;
