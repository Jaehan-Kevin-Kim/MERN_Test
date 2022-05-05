const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    // text: String, // 이렇게 간단히 적어 줄 수도 있고, 아래와 같이 여러가지 option과 함께 적어줄 수 있음
    text: {
      type: String,
      // required: true, // 이렇게 간단히 required 를 true로 설정 해 줄 수 도 있고, 아래와 같이 오류 발생 시 출력되는 error message를 설정 해 줄 수도 있음.
      required: [true, "Please add a text value"],
    },
  },
  {
    timestamps: true,
    // 위 timestamps 를 add 하면, updatedAt, createdAt이 자동으로 생김.
  },
);

module.exports = mongoose.model("Goal", goalSchema);
