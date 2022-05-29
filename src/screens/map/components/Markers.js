import { Typography } from '@mui/material';

const Markers = ({boatObj}) => {
    const bColor = boatObj.status==="active"
        ? "#4FAF2D"
        : "#CA3F3C";
    return <LargeRectangleMarker id={boatObj.id} battery={boatObj.battery} weight={boatObj.weight} bColor={bColor} />

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
                    backgroundColor: "#48466D",
                    backgroundImage:  `linear-gradient(108.63deg, #FFE86D 18.18%, #FFFFFF 33.97%, #fff3e3 44.05%, #fffdc3 53.09%, #fff 62.61%)`,
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
                    style={{ color: "#48466D", fontWeight: 300, fontSize: 15 }}
                >
                    ID: {id}
                </Typography>
                <Typography
                    style={{ color: "#48466D", fontWeight: 300, fontSize: 15 }}
                >
                    Battery: {battery} %
                </Typography>
                <Typography
                    style={{ color: "#48466D", fontWeight: 300, fontSize: 15 }}
                >
                   Storage Weight: {weight} kg
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