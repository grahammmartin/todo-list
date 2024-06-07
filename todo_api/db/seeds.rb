
# seed todos

puts "Data Seeding Started"
todos_array = []
20.times do
  todos_array << { title: Faker::Book.title, description: Faker::Lorem.paragraph, is_completed: [true, false].sample }
end
Todo.insert_all(todos_array)
puts "\n========================"
puts "Data Seeding Ended"
