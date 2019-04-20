import Mock from "mockjs";

  Mock.mock(/login/, {
    data: {
      userId: "@integer(1,10)",
      "nickname|1": ["Amy", "Michael", "Jack", "John", "Albert","Norton"],
      token: "@string(30)"
    },
  });
