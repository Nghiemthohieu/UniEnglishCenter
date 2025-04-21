export interface Shift {
    id: number;
    shift: string;
    time_start: string;
    time_out: string;
    // các field khác tương ứng
  }

  export interface GetallShift {
    data: Shift[]
  }