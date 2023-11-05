import { Card, Metric, Text } from "@tremor/react";

const style = {
    backgroundColor: '#BED1F9',
    height: '75px',
    width: '150px',
    fontFamily: 'Lexend Deca',
    fontSize: '23px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '20px',
    marginTop: '1rem',
    cursor: 'pointer'
}

const OptionTab = ({ name, onClick }) => {
    const regExp = /\(([^)]+)\)/;
    const named = regExp.exec(name)[1];

    return (
        <div style={style} onClick={() => onClick}>
            {/* {name} */}
            <Card className="max-w-xs mx-auto" decoration="top" decorationColor="indigo">
                <Text>Stock</Text>
                <Metric>{named}</Metric>
            </Card>
        </div>
    )
}

export default OptionTab