{items.map(item=>(
    <div style={{marginBottom:'20px'}}>
        <div>Center Name: {item.name}</div>
        <div>Address: {item.address}</div>
        <div>{item.vaccine}: {item.fee}</div>
    </div>
))} 