class PriorityQueue {
    
    constructor(comparator) {
        this.comparator = comparator;
        this.items = [];
    }
    
    size() {
        return this.items.length;
    }
    
    isEmpty() {
        return this.size() === 0;
    }
    
    queue(item) {
        let contain = false;
        for (let i = 0; i < this.items.length; i++) {
            if (this.compare(item, this.items[i]) < 0) {
                // Once the correct location is found it is
                // enqueued
                this.items.splice(i, 0, item);
                contain = true;
                break;
            }
        }

        // if the element have the highest priority
        // it is added at the end of the queue
        if (!contain) {
            this.items.push(item);
        }
    }
    
    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items.shift();
    }
    
    front() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items[0];
    }
    
    rear() {
        if(this.isEmpty()) {
            return null;
        }
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }
    
    compare(a, b) {
        return this.comparator(a, b);
    }
    
}

export default PriorityQueue;
