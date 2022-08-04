import { Typography } from '@mui/material';

const Markers = (props) => {
    let bColor;
    switch (props.status){
        case "active":
            bColor = "#85D191";
            break;
        case "inactive":
            bColor = "#D98C8C";
            break;
        case "moving":
            bColor = "#EDEF7C"
    }
    return <LargeRectangleMarker id={props.boatId} battery={props.battery} weight={props.weight} bColor={bColor} />

}

const LargeRectangleMarker = ( {
    bColor,
    id,
    battery,
    weight
}) => {
    
    return (
        <div
            style={{
                position: "absolute",
                transform: "translate(-50%, -100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    minHeight: 32,
                    minWidth: 160,
                    backgroundColor: "#fff",
                    borderWidth: 4,
                    borderColor: bColor,
                    borderStyle: "solid",
                    borderRadius: 14,
                    padding: "2px 8px 4px 8px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
                className="has-shadow"
            >

                <Typography
                    style={{ color: "#48466D", fontWeight: 600, fontSize: 15,  }}
                >
                    Boat ID: {id}
                </Typography>
                <Typography
                    style={{ color: "#48466D", fontWeight: 300, fontSize: 15 }}
                >
                    Battery Remain: {Math.floor(battery)}%
                </Typography>
                <Typography
                    style={{ color: "#48466D", fontWeight: 300, fontSize: 15 }}
                >
                   Latest Unload Weight: {Math.floor(weight)}kg
                </Typography>
                
            </div>
            <div
                style={{
                    height: 16,
                    width: 3,
                    backgroundColor: bColor,
                }}
            />
            <div
                style={{
                    height: 8,
                    width: 8,
                    backgroundColor: bColor,
                    transform: "rotate(45deg)",
                }}
            />
        </div>
    );
};

export default Markers;