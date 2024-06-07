FactoryBot.define do
  factory :todo do
    title { Faker::Lorem.sentence }
    description { Faker::Lorem.paragraph }
    is_completed { false }
  end
end
