export class Seat {

    id: Number;
    x: Number;
    y: Number;
    img: any;
    capacity: Number;
    color: String;
    cleanStatus: String;
    serverName: String;
    orders: Object;

    
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, 80, 80);
        ctx.rect(this.x, this.y, 80, 80);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    
    update(ctx) {
        switch (this.cleanStatus) {
            case "clean":
                this.color = "#255A02";
                break;

            case "dirty":
                this.color = "#E88F1A";
                break;

            case "occupied":
                this.color = "#732002";
                break;
        }
        this.draw(ctx);
    }
} 